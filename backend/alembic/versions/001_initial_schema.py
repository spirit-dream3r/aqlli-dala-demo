"""initial_schema

Revision ID: a1b2c3d4e5f6
Revises: 
Create Date: 2024-03-01 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create users table
    op.create_table('users',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('full_name', sa.String(length=255), nullable=False),
        sa.Column('phone_number', sa.String(length=20), nullable=False),
        sa.Column('telegram_id', sa.Integer(), nullable=True),
        sa.Column('telegram_username', sa.String(length=255), nullable=True),
        sa.Column('language', sa.String(length=5), nullable=True, default='uz'),
        sa.Column('created_at', sa.DateTime(), nullable=True, server_default=sa.func.now()),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('phone_number'),
        sa.UniqueConstraint('telegram_id')
    )
    
    # Create indexes for users table
    op.create_index('idx_users_phone', 'users', ['phone_number'], unique=False)
    op.create_index('idx_users_telegram', 'users', ['telegram_id'], unique=False)
    
    # Create fields table
    op.create_table('fields',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('field_name', sa.String(length=255), nullable=False),
        sa.Column('crop_type', sa.String(length=100), nullable=True, default='unknown'),
        sa.Column('owner_phone', sa.String(length=20), nullable=True),
        sa.Column('moisture_threshold', sa.Integer(), nullable=True, default=25),
        sa.Column('latitude', sa.Float(), nullable=True),
        sa.Column('longitude', sa.Float(), nullable=True),
        sa.Column('area_hectares', sa.Float(), nullable=True, default=1.0),
        sa.Column('created_at', sa.DateTime(), nullable=True, server_default=sa.func.now()),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('field_name'),
        sa.ForeignKeyConstraint(['owner_phone'], ['users.phone_number'], )
    )
    
    # Create indexes for fields table
    op.create_index('idx_fields_name', 'fields', ['field_name'], unique=False)
    op.create_index('idx_fields_owner', 'fields', ['owner_phone'], unique=False)
    
    # Create telemetry table
    op.create_table('telemetry',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('field_id', sa.String(length=255), nullable=False),
        sa.Column('moisture', sa.Integer(), nullable=False),
        sa.Column('temperature', sa.Float(), nullable=True, default=0.0),
        sa.Column('battery_level', sa.Integer(), nullable=True, default=100),
        sa.Column('timestamp', sa.DateTime(), nullable=True, server_default=sa.func.now()),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['field_id'], ['fields.field_name'], )
    )
    
    # Create indexes for telemetry table
    op.create_index('idx_telemetry_field_time', 'telemetry', ['field_id', 'timestamp'], unique=False)
    op.create_index('idx_telemetry_timestamp', 'telemetry', ['timestamp'], unique=False)
    
    # Create alerts table
    op.create_table('alerts',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('field_id', sa.String(length=255), nullable=False),
        sa.Column('alert_type', sa.String(length=50), nullable=False),
        sa.Column('message', sa.String(length=1000), nullable=True),
        sa.Column('is_sent', sa.Integer(), nullable=True, default=0),
        sa.Column('created_at', sa.DateTime(), nullable=True, server_default=sa.func.now()),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['field_id'], ['fields.field_name'], )
    )
    
    # Create indexes for alerts table
    op.create_index('idx_alerts_field', 'alerts', ['field_id'], unique=False)
    op.create_index('idx_alerts_type', 'alerts', ['alert_type'], unique=False)
    
    # Create news table
    op.create_table('news',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('tg_message_id', sa.Integer(), nullable=False),
        sa.Column('chat_id', sa.Integer(), nullable=True),
        sa.Column('title', sa.String(length=500), nullable=True),
        sa.Column('text', sa.String(length=5000), nullable=True),
        sa.Column('media_json', sa.String(length=2000), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True, server_default=sa.func.now()),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('tg_message_id')
    )
    
    # Create indexes for news table
    op.create_index('idx_news_message', 'news', ['tg_message_id'], unique=False)
    op.create_index('idx_news_created', 'news', ['created_at'], unique=False)


def downgrade() -> None:
    # Drop tables in reverse order (with foreign key checks disabled)
    op.drop_index('idx_news_created', table_name='news')
    op.drop_index('idx_news_message', table_name='news')
    op.drop_table('news')
    
    op.drop_index('idx_alerts_type', table_name='alerts')
    op.drop_index('idx_alerts_field', table_name='alerts')
    op.drop_table('alerts')
    
    op.drop_index('idx_telemetry_timestamp', table_name='telemetry')
    op.drop_index('idx_telemetry_field_time', table_name='telemetry')
    op.drop_table('telemetry')
    
    op.drop_index('idx_fields_owner', table_name='fields')
    op.drop_index('idx_fields_name', table_name='fields')
    op.drop_table('fields')
    
    op.drop_index('idx_users_telegram', table_name='users')
    op.drop_index('idx_users_phone', table_name='users')
    op.drop_table('users')
