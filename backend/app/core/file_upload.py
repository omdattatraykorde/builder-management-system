import os
import uuid
from fastapi import UploadFile

UPLOAD_DIR = "uploads/site_photos"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_image(file: UploadFile):
    extension = file.filename.split(".")[-1]

    filename = f"{uuid.uuid4()}.{extension}"

    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as buffer:
        buffer.write(file.file.read())

    return filepath.replace("\\", "/")