"""add_user_auth_fields

Revision ID: a1b2c3d4e5f7
Revises: a1b2c3d4e5f6
Create Date: 2024-03-03 14:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a1b2c3d4e5f7'
down_revision: Union[str, None] = 'a1b2c3d4e5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add new columns to users table
    op.add_column('users', sa.Column('hashed_password', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('is_active', sa.Integer(), nullable=True, default=1))
    op.add_column('users', sa.Column('is_verified', sa.Integer(), nullable=True, default=0))
    op.add_column('users', sa.Column('updated_at', sa.DateTime(), nullable=True, server_default=sa.func.now(), onupdate=sa.func.now()))


def downgrade() -> None:
    op.drop_column('users', 'updated_at')
    op.drop_column('users', 'is_verified')
    op.drop_column('users', 'is_active')
    op.drop_column('users', 'hashed_password')
