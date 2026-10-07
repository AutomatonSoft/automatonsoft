from io import BytesIO
from pathlib import Path

from django.core.files.base import ContentFile
from PIL import Image, ImageOps, UnidentifiedImageError

# Portfolio cards render at most ~500 CSS px wide; 1600 px covers 3x screens and the largest layouts.
MAX_WIDTH = 1600
WEBP_QUALITY = 82


class InvalidImage(ValueError):
    pass


def optimize_image(file):
    """Return the upload as a resized WebP ContentFile, keeping the original file stem."""
    try:
        image = ImageOps.exif_transpose(Image.open(file))
    except (UnidentifiedImageError, OSError) as error:
        raise InvalidImage(str(error)) from error
    if image.mode not in ('RGB', 'RGBA'):
        image = image.convert('RGBA' if 'transparency' in image.info or image.mode in ('LA', 'PA') else 'RGB')
    if image.width > MAX_WIDTH:
        image = image.resize((MAX_WIDTH, round(image.height * MAX_WIDTH / image.width)), Image.LANCZOS)
    buffer = BytesIO()
    image.save(buffer, 'WEBP', quality=WEBP_QUALITY, method=6)
    return ContentFile(buffer.getvalue(), name=f'{Path(file.name).stem}.webp')
