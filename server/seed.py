#!/usr/bin/env python3

# Standard library imports
from random import choice as rc, random, randint

# Remote library imports
from faker import Faker


# Local imports
from app import app
from models import db, User, ToDoList, ToDoItem, ShoppingItem, Location, Event

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing databases...")
        User.query.delete()
        ToDoList.query.delete()
        ToDoItem.query.delete()
        ShoppingItem.query.delete()
        Location.query.delete()
        Event.query.delete()

        print("Initializing databases...")
        db.create_all()
        
        print("Seeding users_table...")
        for _ in range(15):
            u = User(
                username = fake.name(),
                email = fake.email(),
                password_hash = "test123-/:", 
                first_name=fake.first_name(),
                last_name=fake.last_name(),
            )

            db.session.add(u)
            db.session.commit()
        print("Finished seeding users_table")
        print("Seeding locations_table...")
        for _ in range(550):
            l = Location(
                user_id = randint(1, 15),
                title = fake.company(),
                usage = randint(1, 15)
            )

            db.session.add(l)
            db.session.commit()
        print("Finished seeding locations_table")
        print("Seeding shopping_items_table...")
        ingredient_list = ["Flour", "Sugar", "Eggs", "Milk", "Butter", "Salt", "Pepper", "Garlic", "Onion", "Olive Oil", "Baking Powder", "Vanilla Extract", "Cinnamon", "Honey", "Lemon", "Chocolate", "Yeast", "Basil", "Parsley", "Thyme", "Soy Sauce", "Vinegar", "Tomato", "Paprika", "Cumin", "Ginger", "Chili Powder", "Mustard", "Bay Leaf", "Coriander", "Rosemary", "Nutmeg", "Cocoa Powder", "Maple Syrup", "Coconut Milk", "Almond Flour", "Cashews", "Hazelnuts", "Quinoa", "Brown Rice", "Pasta", "Shrimp", "Salmon", "Chicken", "Beef", "Pork", "Tofu", "Lentils", "Black Beans", "Kidney Beans", "Chickpeas", "Green Beans", "Carrots", "Celery", "Lettuce", "Spinach", "Kale", "Cabbage", "Cauliflower", "Broccoli", "Zucchini", "Potato", "Sweet Potato", "Pumpkin", "Avocado", "Cucumber", "Bell Pepper", "Mushrooms", "Eggplant", "Asparagus", "Radishes", "Turnips", "Blueberries", "Strawberries", "Raspberries", "Bananas", "Apples", "Oranges", "Limes", "Grapes", "Watermelon", "Pineapple", "Kiwi", "Mango", "Peaches", "Plums", "Cherries", "Coconut", "Peanut Butter", "Jelly", "Bread", "Tortillas", "Salsa", "Guacamole", "Sour Cream", "Cheese", "Yogurt", "Ice Cream", "Whipped Cream", "Mayonnaise", "Ketchup", "Mustard"# Add more ingredients as desired
        ]
        ingredient_categories = ["Flour and Grains", "Sugar and Sweeteners", "Dairy and Alternatives", "Fats and Oils", "Herbs and Spices", "Sauces and Condiments", "Meat and Protein", "Legumes and Beans", "Vegetables", "Fruits", "Nuts and Seeds", "Beverages", "Bakery", "Snacks", "Dressings and Dips" # Add more categories as needed
        ]
        

        for _ in range(950):
            user_id = randint(1, 15)
            locations = Location.query.filter_by(user_id = user_id).all()
            si = ShoppingItem(
                user_id = user_id,
                location_id = rc(locations).id,
                title = rc(ingredient_list),
                quantity = randint(1, 30),
                category = rc(ingredient_categories)
            )
            db.session.add(si)
            db.session.commit()
        print("Finished seeding shopping_items_table")
        print("Seeding to_do_lists_table...")
        for _ in range(175):
            tdl = ToDoList(
                user_id = randint(1, 15),
                title = fake.company(),
                repeats = rc(['Never', 'Never', 'Never', 'Never', 'Never', 'Never', 'Never', 'Never', 'Never', 'Never', 'Never', 'Never', 'Never', 'Never', 'Never', 'Never', 'Never', 'Yearly', 'Monthly', 'Weekly', 'Daily'])
            )
            db.session.add(tdl)
            db.session.commit()
        print("Finished seeding to_do_lists_table")
        print("Seeding to_do_items_table...")
        for _ in range(10000):
            tdi = ToDoItem(
                toDoList_id = randint(1, 175),
                event_id = None,
                title = fake.text(max_nb_chars=10),
                description = fake.paragraph(nb_sentences=5),
                start_date = rc([None, None, None, None, None, None, None, None, None, fake.date_time()]),
                end_date = rc([None, None, None, None, None, None, None, None, None, fake.date_time()]),
                completion_status = rc(['Not Started', 'Completed']),
                urgency = rc(['Not Urgent', 'Urgent']),
                importance = rc(['Not Important', 'Important'])
            )
            db.session.add(tdi)
            db.session.commit()
        print("Finished seeding to_do_lists_table")
        print("Finished seeding")


        