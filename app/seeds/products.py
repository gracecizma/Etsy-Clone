from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from random import randint


# Adds a demo products
def seed_products():
    for i in range(20):
        product = Product(
            name=f"Product {i+1}",
            description=f"This is the description for Product {i+1}",
            category=f"Category {randint(1, 5)}",
            price=round(randint(1, 10000) / 100, 2),
            quantity=randint(1, 100),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            seller_id=randint(1, 3)  # seller ID can be 1, 2, or 3
        )
        db.session.add(product)

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()