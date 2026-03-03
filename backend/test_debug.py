import re
from config import settings

phone = "8901234567"
cleaned = re.sub(r'[^\d]', '', phone)
print(f"After clean: '{cleaned}' (len={len(cleaned)})")

if cleaned.startswith('8') and len(cleaned) == 11:
    cleaned = '+998' + cleaned[1:]
    print(f"After transform: '{cleaned}' (len={len(cleaned)})")

# Validate
pattern = settings.PHONE_PATTERN
print(f"Pattern: {pattern}")
match = re.match(pattern, cleaned)
print(f"Match: {match}")
