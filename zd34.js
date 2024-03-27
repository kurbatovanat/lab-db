use kurbdb;

db.createCollection('users');
show dbs;
console.log('add to users:');
db.users.insertOne({userId: 1, login:  'u1'});
db.users.insertMany([{userId: 2, login: 'u2'},
{userId: 3, login: 'u3'}
]);

console.log('users:');
db.users.find();

db.createCollection('messages');
show dbs;

console.log('insert into messages:');
db.messages.insertMany([{userId: 1, msg: 'msg1'},
{userId: 3, msg: 'msg2'},
{userId: 2, msg: 'msg3'},
{userId: 1, msg: 'msg4'},
{userId: 3, msg: 'msg5'}
]);

console.log('messages:');
db.users.find();

console.log('aggregate:');
db.users.aggregate([
  {
    $lookup: {
      from: 'messages',
      localField: 'userId',
      foreignField: 'userId',
      as: 'userMsg'
    }
  }
]);

console.log('replace document:');
db.messages.replaceOne({msg: 'msg5'}, {login: 'user_x', msg : 'hello'});

console.log('messages:');
db.messages.find();


console.log('updateOne:');
db.users.updateOne({userId: 3}, {$set: {age: 28}});

console.log('users:');
db.users.find();


console.log('find and update');
db.users.findOneAndUpdate({login: 'u2'}, { $set: {age: 44}});

console.log('users:');
db.users.find();


console.log('delete document:');
db.messages.deleteOne({msg: 'msg4'});

console.log('messages:');
db.messages.find();


console.log('delete db:');
db.messages.drop();
db.users.drop();
db.dropDatabase();