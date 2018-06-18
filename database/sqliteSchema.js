import SQLite from "react-native-sqlite-2";
//dolby
export const insertNewTodoList = newtodoList =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("dummy.db", "1.0", "", 1);
    try {
      //DATETIME DEFAULT CURRENT_TIMESTAMP

      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30), creationDate CURRENT_TIMESTAMP , id INT)",
          []
        );

        tx.executeSql(
          "INSERT INTO Users (name, creationDate, id) VALUES ( :name, :creationDate, :id)",
          [newtodoList.name, newtodoList.creationDate, newtodoList.id]
        );

        tx.executeSql(
          "SELECT * FROM `Users`",
          [],
          (tx, res) => {
            resolve(res.rows._array);
          },
          (tx, err) => reject({ err })
        );
      });
    } catch (err) {
      reject({ err });
    }
  });

export const deleteTodoList = todoListId =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("dummy.db", "1.0", "", 1);
    try {
      db.transaction(tx => {
        tx.executeSql("DELETE FROM Users WHERE id = (:id)", [todoListId]);

        tx.executeSql(
          "SELECT * FROM `users`",
          [],
          (tx, res) => {
            resolve(res.rows._array);
          },
          (tx, err) => reject({ err })
        );
      });
    } catch (err) {
      reject({ err });
    }
  });

export const queryAllTodoLists = userId =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("dummy.db", "1.0", "", 1);

    try {
      //DATETIME DEFAULT CURRENT_TIMESTAMP

      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30), creationDate CURRENT_TIMESTAMP , id INT)",
          []
        );

        tx.executeSql(
          "SELECT * FROM `Users` WHERE user_id > (:userId)  ORDER BY user_id  LIMIT 7",
          [userId],
          (tx, res) => {
            // WHERE user_id > 0 ORDER BY user_id  LIMIT 10
            console.log(res, "qeuery");
            resolve(res.rows._array);
          },
          (tx, err) => reject({ err })
        );
      });
    } catch (err) {
      reject({ err });
    }
  });

export const updateTodoList = todoList =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("dummy.db", "1.0", "", 1);
    try {
      db.transaction(tx => {
        tx.executeSql(
          "UPDATE Users SET name = (:name) , creationDate = (:creationDate) WHERE id = (:id)",
          [todoList.name, todoList.creationDate, todoList.id]
        );

        tx.executeSql(
          "SELECT * FROM `users`",
          [],
          (tx, res) => {
            resolve(res.rows._array);
          },
          (tx, err) => reject({ err })
        );
      });
    } catch (err) {
      reject({ err });
    }
  });

export const filterByDate = (name, datex) =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("dummy.db", "1.0", "", 1);

    if (name === "") {
      try {
        db.transaction(tx => {
          console.log("updatedtodoList Date", datex);
          tx.executeSql(
            "SELECT * FROM `users` WHERE creationDate = (:creationDate)",
            [datex],
            (tx, res) => {
              //   console.log("updatedtodoList Date res", res);
              resolve(res.rows._array);
            },
            (tx, err) => reject({ err })
          );
        });
      } catch (err) {
        reject({ err });
      }
    } else {
      try {
        db.transaction(tx => {
          console.log("updatedtodoList Date", datex);
          tx.executeSql(
            "SELECT * FROM `users` WHERE creationDate = (:creationDate) AND name =(:name)",
            [datex, name],
            (tx, res) => {
              //   console.log("updatedtodoList Date res", res);
              resolve(res.rows._array);
            },
            (tx, err) => reject({ err })
          );
        });
      } catch (err) {
        reject({ err });
      }
    }
  });

export const filterByName = name =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("dummy.db", "1.0", "", 1);

    try {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM `users` WHERE name = (:name)",
          [name],
          (tx, res) => {
            //   console.log("updatedtodoList Date res", res);
            resolve(res.rows._array);
          },
          (tx, err) => reject({ err })
        );
      });
    } catch (err) {
      reject({ err });
    }
  });

export const sortByNameAsc = () =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("dummy.db", "1.0", "", 1);

    try {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM `users` ORDER BY name ASC",
          [],
          (tx, res) => {
            console.log("sort Resp", res);
            resolve(res.rows._array);
          },
          (tx, err) => reject({ err })
        );
      });
    } catch (err) {
      reject({ err });
    }
  });

export const sortByNameDesc = () =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("dummy.db", "1.0", "", 1);

    try {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM `users` ORDER BY name DESC",
          [],
          (tx, res) => {
            console.log("sort desc", res);
            resolve(res.rows._array);
          },
          (tx, err) => reject({ err })
        );
      });
    } catch (err) {
      reject({ err });
    }
  });

//SELECT last_insert_rowid()

//sort by date..

export const sortByDateAsc = () =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("dummy.db", "1.0", "", 1);

    try {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM `users` ORDER BY creationDate ASC",
          [],
          (tx, res) => {
            console.log("sort date Asc", res);
            resolve(res.rows._array);
          },
          (tx, err) => reject({ err })
        );
      });
    } catch (err) {
      reject({ err });
    }
  });

export const sortByDateDsc = () =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("dummy.db", "1.0", "", 1);

    try {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM `users` ORDER BY creationDate DESC",
          [],
          (tx, res) => {
            console.log("sort date desc", res);
            resolve(res.rows._array);
          },
          (tx, err) => reject({ err })
        );
      });
    } catch (err) {
      reject({ err });
    }
  });

export const getLastInsertedId = () =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("dummy.db", "1.0", "", 1);

    try {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT user_id FROM `users` ORDER BY user_id DESC LIMIT 1 ",
          [],
          (tx, res) => {
            console.log("getLastInserted", res.rows._array[0].user_id);
            resolve(res.rows._array[0].user_id);
          },
          (tx, err) => reject({ err })
        );
      });
    } catch (err) {
      reject({ err });
    }
  });

//SELECT * FROM table ORDER BY column DESC LIMIT 1;
//SELECT * FROM TableName ORDER BY id OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;

export const getLastInsertedIdtwo = () =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("dummy.db", "1.0", "", 1);

    try {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM Users` ORDER BY user_id OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY",
          [],
          (tx, res) => {
            console.log("getLastInsertedtwo", res);
            resolve(res.rows._array);
          },
          (tx, err) => reject({ err })
        );
      });
    } catch (err) {
      reject({ err });
    }
  });
