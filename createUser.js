//createUser -> taskRepository
class createUser {
    constructor(dao) {
      this.dao = dao
    }
  

    //creating table

    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS
      users
       (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
       username VARCHAR(30) ,
       firstname VARCHAR(30),
       lastname VARCHAR(30),
       email VARCHAR(100),
       password VARCHAR(255) ,
       createdAt DATETIME ,
       updatedAt DATETIME
       );
      
            `
      return this.dao.run(sql)
    }

    //inserting into tables 

    //todo : handle same username case 
    //todo : handle hashed password
        createNewUser(username, firstname, lastname, email, password, createdAt, updatedAt) {
        return this.dao.run(
          `INSERT INTO 
          users (
              id,username, firstname, lastname, email, password, createdAt, updatedAt)
               VALUES (NULL, ?, ?, ?,?, ?, ?, ?);`,
          [username, firstname, lastname, email, password, createdAt, updatedAt]).then((res)=>{
            console.log('user entered into db sqlite');
          })
        }


      //insert again

    //   create(name, description, isComplete, projectId) {
    //     return this.dao.run(
    //       `INSERT INTO tasks (name, description, isComplete, projectId)
    //         VALUES (?, ?, ?, ?)`,
    //       [name, description, isComplete, projectId])
    //   }


      //update

    //   update(task) {
    //     const { id, name, description, isComplete, projectId } = task
    //     return this.dao.run(
    //       `UPDATE tasks
    //       SET name = ?,
    //         description = ?,
    //         isComplete = ?,
    //         projectId = ?
    //       WHERE id = ?`,
    //       [name, description, isComplete, projectId, id]
    //     )
    //   }

      //deleting
    //   delete(id) {
    //     return this.dao.run(
    //       `DELETE FROM tasks WHERE id = ?`,
    //       [id]
    //     )
    //   }

      //select command on username
      //change name
      getUserByUsername(id){
          return this.dao.get(
              `SELECT id, username, firstname, lastname, email, password, createdAt, updatedAt FROM users 
              AS user WHERE user.id = ?`,[id]

          ).then((slctRes)=>{
            console.log(slctRes);
          })
      }
      
      //select command on userId
      getUserByUserId(userId){
        return this.dao.all(
            `SELECT id, username, firstname, lastname, email, password, createdAt, updatedAt FROM users 
            AS user WHERE user.id = ?`,[userId]
        )
    }
    

      //select command
    //   getById(id) {
    //     return this.dao.get(
    //       `SELECT * FROM tasks WHERE id = ?`,
    //       [id])
    //   }
  }
  
  module.exports = createUser;