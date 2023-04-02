from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from random import randint


def seed_reviews():
    for i in range(34):
        review = Review(
            user_id=randint(4, 32),
            product_id=randint(1, 20),
            comment=f"this is review # {i}",
            stars=randint(1, 6),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.session.add(review)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
