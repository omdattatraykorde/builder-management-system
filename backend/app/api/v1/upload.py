from fastapi import APIRouter, UploadFile, File

from app.core.file_upload import save_image

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
):
    image_path = save_image(file)

    return {
        "image_url": image_path,
    }