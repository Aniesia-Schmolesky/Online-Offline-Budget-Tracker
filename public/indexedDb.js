export function useIndexedDb(databaseName, budgetName, method, object) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(databaseName, 1);
      let db,
        up,
        budget;
  
      request.onupgradeneeded = function(e) {
        const db = request.result;
        db.createObjectStore(budgetName, { keyPath: "_id" });
      };
  
      request.onerror = function(e) {
        console.log("There was an error");
      };
  
      request.onsuccess = function(e) {
        db = request.result;
        up = db.transaction(budgetName, "readwrite");
        budget = up.objectStore(budgetName);
  
        db.onerror = function(e) {
          console.log("error");
        };
        if (method === "put") {
          budget.put(object);
        }
        if (method === "get") {
          const all = budget.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
        }
        up.oncomplete = function() {
          db.close();
        };
      };
    });
  }
  