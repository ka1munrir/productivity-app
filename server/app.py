#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, ToDoList, ToDoItem, ShoppingItem, Location, Event


def locationPost(user_id, title, usage):
    try:
        new_location = Location(
            user_id=user_id,
            title=title,
            usage=usage
        )
    except ValueError as e:
        return {"errors": str(e)}, 400
        

    db.session.add(new_location)
    db.session.commit()

    return new_location.to_dict(), 200


# Views go here!

@app.route('/')
def index():
    return '<h1>Productivity App Server</h1>'

class Login_Route(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter_by(username=username).first()
# sourcery skip: merge-nested-ifs
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
            else:
                return {"Error": "Password is incorrect"}, 401
        return {"Error": "User doesn't exist"}, 401
api.add_resource(Login_Route, '/login')
class Logout_Route(Resource):
    def delete(self):
        session['user_id'] = None
        return {'Message':''}, 204
api.add_resource(Logout_Route, '/logout')
class CheckSession(Resource):
    def get(self):
        user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            return user.to_dict(), 200
        return {'message': 'Not Authorized'}, 401
api.add_resource(CheckSession, '/check_session')

class Users_Route(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200
    def post(self):
        # print(request.get_json())
        try:
            new_user = User(
                first_name=request.get_json()['first_name'],
                last_name=request.get_json()['last_name'],
                email=request.get_json()['email'],
                username=request.get_json()['username'],
                password_hash=request.get_json()['password']
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
            

        db.session.add(new_user)
        db.session.commit()

        return new_user.to_dict(), 200
api.add_resource(Users_Route, '/users')
class UserById_Route(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        return user.to_dict(), 200 if user else {"error": "User not found"}, 404
    def patch(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(user, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 202
        
        return {"error": "User not found"}, 404
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                db.session.delete(user)
                db.session.commit()
                return '', 204
            except Exception:
                return 'Something went wrong in the user deletion process', 400
        else:
            return {"error": "User not found"}, 404
api.add_resource(UserById_Route, '/users/<int:id>')

class ToDoList_Route(Resource):
    def get(self):
        toDoLists = [toDoList.to_dict() for toDoList in ToDoList.query.all()]
        return toDoLists, 200
    def post(self):
        try:
            new_toDoList = ToDoList(
                user_id=request.get_json().get('user_id'),
                title=request.get_json().get('title'),
                repeats=request.get_json().get('repeats')
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
            

        db.session.add(new_toDoList)
        db.session.commit()

        return new_name.to_dict(), 200
api.add_resource(ToDoList_Route, '/todolists')
class ToDoListById_Route(Resource):
    def get(self, id):
        toDoList = ToDoList.query.filter_by(id=id).first()
        if toDoList:
            return toDoList.to_dict(), 200
        return {"error": "ToDoList not found"}, 404
    def patch(self, id):
        toDoList = ToDoList.query.filter_by(id=id).first()

        if toDoList:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(toDoList, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(toDoList)
                db.session.commit()
                return toDoList.to_dict(), 202
        
        return {"error": "Name not found"}, 404
    
    def delete(self, id):
        toDoList = ToDoList.query.filter_by(id=id).first()
        if toDoList:
            try:
                db.session.delete(toDoList)
                db.session.commit()
                return '', 204
            except Exception:
                return 'Something went wrong in the to do list deletion process', 400
        else:
            return {"error": "ToDoList not found"}, 404
api.add_resource(ToDoListById_Route, '/todolists/<int:id>')

class ToDoItem_Route(Resource):
    def post(self):
        try:
            new_toDoItem = ToDoItem(
                toDoList_id=request.get_json().get('toDoList_id'),
                event_id=request.get_json().get('event_id'),
                title=request.get_json().get('title'),
                description=request.get_json().get('description'),
                start_date=request.get_json().get('start_date'),
                end_date=request.get_json().get('end_date'),
                completion_status=request.get_json().get('completion_status'),
                urgency=request.get_json().get('urgency'),
                importance=request.get_json().get('importance')
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
            

        db.session.add(new_toDoItem)
        db.session.commit()

        return new_toDoItem.to_dict(), 200
api.add_resource(ToDoItem_Route, '/todoitems')
class ToDoItemById_Route(Resource):
    def get(self, id):
        toDoItem = ToDoItem.query.filter_by(id=id).first()
        if toDoItem:
            return toDoItem.to_dict(), 200
        return {"error": "ToDoItem not found"}, 404
    def patch(self, id):
        toDoItem = ToDoItem.query.filter_by(id=id).first()

        if toDoItem:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(toDoItem, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(toDoItem)
                db.session.commit()
                return toDoItem.to_dict(), 202
        
        return {"error": "ToDoItem not found"}, 404
    
    def delete(self, id):
        toDoItem = ToDoItem.query.filter_by(id=id).first()
        if toDoItem:
            try:
                db.session.delete(toDoItem)
                db.session.commit()
                return '', 204
            except Exception:
                return 'Something went wrong in the toDoItem deletion process', 400
        else:
            return {"error": "ToDoItem not found"}, 404
api.add_resource(ToDoItemById_Route, '/todoitems/<int:id>')

class ShoppingItem_Route(Resource):
    def post(self):
        shoppingItemData = request.get_json()
        user_id = shoppingItemData.get('user_id')
        title = shoppingItemData.get('location')

        location = Location.query.filter_by(user_id = user_id).filter_by(title = title).first()
        if location:
            location_id = location.get('id')
        else:
            x =locationPost(user_id=user_id, title=title, usage=1)
            if x[1] == 200:
                location_id = x[0].get('id')
            else:
                return x
        try:
            new_shoppingItem = ShoppingItem(
                user_id=user_id,
                title=shoppingItemData.get('title'),
                quantity=shoppingItemData.get('quantity'),
                location_id=location_id,
                category=shoppingItemData.get('category')
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
            

        db.session.add(new_shoppingItem)
        db.session.commit()

        return new_shoppingItem.to_dict(), 200
api.add_resource(ShoppingItem_Route, '/shoppingitems')
class ShoppingItemById_Route(Resource):
    def get(self, id):
        shoppingItem = ShoppingItem.query.filter_by(id=id).first()
        if shoppingItem:
            return shoppingItem.to_dict(), 200
        return {"error": "shoppingItem not found"}, 404
    def patch(self, id):
        shoppingItem = ShoppingItem.query.filter_by(id=id).first()

        if shoppingItem:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(shoppingItem, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(shoppingItem)
                db.session.commit()
                return shoppingItem.to_dict(), 202
        
        return {"error": "shoppingItem not found"}, 404
    
    def delete(self, id):
        shoppingItem = ShoppingItem.query.filter_by(id=id).first()
        if shoppingItem:
            try:
                db.session.delete(shoppingItem)
                db.session.commit()
                return '', 204
            except Exception:
                return 'Something went wrong in the shoppingItem deletion process', 400
        else:
            return {"error": "shoppingItem not found"}, 404
api.add_resource(ShoppingItemById_Route, '/shoppingitems/<int:id>')

class Location_Route(Resource):
    def post(self):
        x = locationPost(
            user_id=request.get_json().get('user_id'),
            title=request.get_json().get('title'),
            usage=request.get_json().get('usage')
        )
        print(x)
        return x
        # try:
        #     new_location = Location(
        #         user_id=request.get_json().get('user_id'),
        #         title=request.get_json().get('title'),
        #         usage=request.get_json().get('usage')
        #     )
        # except ValueError as e:
        #     return {"errors": str(e)}, 400
            

        # db.session.add(new_location)
        # db.session.commit()

        # return new_location.to_dict(), 200
api.add_resource(Location_Route, '/locations')
class LocationById_Route(Resource):
    def get(self, id):
        location = Location.query.filter_by(id=id).first()
        if location:
            return location.to_dict(), 200
        return {"error": "location not found"}, 404
    def patch(self, id):
        location = Location.query.filter_by(id=id).first()

        if location:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(location, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(location)
                db.session.commit()
                return location.to_dict(), 202
        
        return {"error": "location not found"}, 404
    
    def delete(self, id):
        location = Location.query.filter_by(id=id).first()
        if location:
            try:
                db.session.delete(location)
                db.session.commit()
                return '', 204
            except Exception:
                return 'Something went wrong in the location deletion process', 400
        else:
            return {"error": "location not found"}, 404
api.add_resource(LocationById_Route, '/locations/<int:id>')

class Event_Route(Resource):
    def post(self):
        eventData = request.get_json()
        user_id = eventData.get('user_id')
        title = eventData.get('location')
        location = Location.query.filter_by(user_id = user_id).filter_by(title = title).first()
        if location:
            location_id = location.get('id')
        else:
            x =locationPost(user_id=user_id, title=title, usage=1)
            if x[1] == 200:
                location_id = x[0].get('id')
            else:
                return x
        try:
            new_event = Event(
                user_id=user_id,
                title=eventData.get('title'),
                description=eventData.get('description'),
                start_date=eventData.get('start_date'),
                end_date=eventData.get('end_date'),
                location_id=location_id,
                repeats=eventData.get('repeats')
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
            

        db.session.add(new_event)
        db.session.commit()

        return new_event.to_dict(), 200
api.add_resource(Event_Route, '/events')
class EventById_Route(Resource):
    def get(self, id):
        event = Event.query.filter_by(id=id).first()
        if event:
            return event.to_dict(), 200
        return {"error": "event not found"}, 404
    def patch(self, id):
        event = Event.query.filter_by(id=id).first()

        if event:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(event, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(event)
                db.session.commit()
                return event.to_dict(), 202
        
        return {"error": "event not found"}, 404
    
    def delete(self, id):
        event = Event.query.filter_by(id=id).first()
        if event:
            try:
                db.session.delete(event)
                db.session.commit()
                return '', 204
            except Exception:
                return 'Something went wrong in the event deletion process', 400
        else:
            return {"error": "event not found"}, 404
api.add_resource(EventById_Route, '/names/<int:id>')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)