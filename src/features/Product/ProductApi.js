
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      '/products/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}


export  function  fetchProductById(id) {
  return  new Promise(async (resolve)   => { 
    const response = await fetch('/products/'+id);
    const data = await response.json();
    resolve({data})
  }
  )};
  
  


export  function  fetchProductsByFilter(filter,sort,pagination,admin) {

  //TODO: on server we will support multiple values

 
  let queryString='';
  for(let key in filter){
    const categoryvalues=filter[key];
    if(categoryvalues.length>0){
      const lastcategoryvalue=categoryvalues[categoryvalues.length-1];
      queryString += `${key}=${lastcategoryvalue}&` 
    }
   }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&` 
  }

  
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if(admin){
    queryString += `admin=true`;
  }

  return  new Promise(async (resolve)   => { 
    const response = await fetch('/products?'+queryString);
    const data = await response.json();


    const totalItems=await response.headers.get('X-Total-Count')
    console.log('api worKing')
    resolve({data:{products:data,totalItems:+totalItems}})
  }
  );
}

export  function  fetchCategories() {
  return  new Promise(async (resolve)   => { 
    //Todo: we will not hardcore server-url here
    const response = await fetch('/categories');
    const data = await response.json();
    resolve({data})
  }
  );
}

export  function  fetchBrands( ) {
  return  new Promise(async (resolve)   => { 
    //Todo: we will not hardcore server-url here
    const response = await fetch('/brands');
    const data = await response.json();
    resolve({data})
  }
  );
}
