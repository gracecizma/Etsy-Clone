from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from random import randint
from ..constants.constants import images

images = list(images.values())


def seed_images():
    for i in range(20):
        image = Image(
            url=images[randint(0, len(images)-1)],
            preview=True,
            product_id=randint(1, 20)
        )
        db.session.add(image)

    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))
        
    db.session.commit()
