import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');
export async function createTable() {
  return db.execAsync([{sql:'create table if not exists menuitems (id integer primary key not null, name text, description text, price text, category text, image text);',args:[]}],false)
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export async function saveMenuItems(menuItems = []) {
  return new Promise((resolve, reject) => { 
    db.transaction((tx) => {
      // 2. Implement a single SQL statement to save all menu data in a table called menuitems.
      // Check the createTable() function above to see all the different columns the table has
      // Hint: You need a SQL statement to insert multiple rows at once.
      tx.executeSql(
        `INSERT INTO menuitems (id, name, price, description, image, category) VALUES 
          ${menuItems.map((row = {name:"",price:"", category:{"title":""}}, i)=>{
            return `("${i}", "${row.name}", "${row.price}", "${row.description}", "${row.image}", "${row.category}")`;
          }).join(',')}
        `
      )
    },  (e)=>{
      console.log(e)
      // console.log(e);
    }, resolve(true),);
  });
}

 export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      let q = `select * from menuitems where ${(query ? `(name LIKE '%${query}%' OR description LIKE '%${query}%') AND `: '')}(${activeCategories.map(cat=>`category="${cat}"`).join(' OR ')})`;
      q = `select * from menuitems where ${(query) ? `(name LIKE '%${query}%' OR description LIKE '%${query}%') AND`:''} (${activeCategories.map(cat=>`category="${cat.toLowerCase()}"`).join(' OR ')})`
      tx.executeSql(q, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}