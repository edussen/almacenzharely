let customers = [];
let _coderesit = 0;
let _verificador = false

async function fetchCustomers() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "https://api.siigo.com/v1/products?page=";
    const url_account_groups = "https://api.siigo.com/v1/account-groups";
    let page = 1;
    let moreData = true;
    const pageSize = 100;

    try {
        while (moreData) {
            // Llamar a la API para obtener productos de la página actual
            const response = await fetch(proxyUrl + apiUrl + page + `&page_size=${pageSize}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Partner-Id": "POS"
                }
            });

            const data = await response.json();

            // Verifica si se recibieron resultados
            if (data.results && data.results.length > 0) {
                customers = [...customers, ...data.results]; // Concatenar productos al array
                if (page === 1){
                    _coderesit = parseFloat(data.results[0].code)
                    _coderesit += 0.01
                }
                console.log(`Productos obtenidos de la página ${page}:`, data.results);
            } else {
                moreData = false; // Si no hay más resultados, detener la paginación
            }

            page++;
        }

        console.log("Todos los productos obtenidos:", customers);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

function sumarCode(){
    _coderesit += 0.01
    console.log(_coderesit)
}

function NuevoproductoCode(_table){
    customers = [...customers, ..._table]; // Concatenar productos al array

    console.log(customers)
}

function _UpdateProduct(id, _name, _code, _category, _barcode, _price) {
    console.log(id)
    // Aplanar el array y buscar
    const obj = customers.flatMap(subArray => subArray).find(item => item.id === id);
    console.log(obj)
    if (obj) {
        obj.name = _name; // Actualizar el objeto si se encuentra
        obj.code = _code; // Actualizar el objeto si se encuentra
        obj.account_group.id = _category; // Actualizar el objeto si se encuentra
        obj.additional_fields.barcode = _barcode; // Actualizar el objeto si se encuentra
        obj.prices[0].price_list[0].value = _price; // Actualizar el objeto si se encuentra

        console.log("Objeto actualizado:", obj);
    } else {
        console.log("No se encontró el objeto con el ID:", id);
    }
}

function _cancelarverificacion(){
    _verificador = true
}
function _activarVerificacion(){
    _verificador = false
}

function searchCustomer() {
    const _denuevoFound = document.getElementById('_denuevoFound');
    const searchTerm = document.getElementById('barcodeInput').value.trim().toLowerCase(); // Obtener el texto de búsqueda
    const resultDiv = document.getElementById('searchResults');
    const _maincontainer = document.getElementById('_maincontainer');
    const _noFound = document.getElementById('_noFound');
    const _yesFound = document.getElementById('_yesFound');
    const _empiezaound = document.getElementById('_empiezaound');
    const barcodeInput = document.getElementById('barcodeInput');
    const _maincontainerEdit = document.getElementById('_maincontainerEdit');
    const _barcodeEdit = document.getElementById('_barcodeEdit');

    if (_verificador){
        _verificador = false
        _denuevoFound.style.display = 'none';
    
        const filteredCustomers = customers.filter(customer => {
            // Comprobar si el cliente tiene un campo additional_fields y barcode
            if (!customer.additional_fields || !customer.additional_fields.barcode) {
                return false; // Si no tiene barcode, lo excluimos de los resultados
            }
    
            return customer.additional_fields.barcode.toLowerCase() === searchTerm;
        });
    
        // Limpiar resultados anteriores
        resultDiv.innerHTML = '';
    
        if (filteredCustomers.length > 0) {
            // Mostrar los resultados en la página
            filteredCustomers.forEach(customer => {
    
                const customerDiv = document.createElement('div');
                const numero = customer.prices[0].price_list[0].value;
                const formateado = numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
                _barcodeEdit.value = customer.  additional_fields.barcode
                document.getElementById('_idEdit').value = customer.id


                document.getElementById('_nameEdit').value = customer.name
                document.getElementById('_categorityEdit').value = customer.account_group.id
                document.getElementById('_precioEdit').value = customer.prices[0].price_list[0].value
                document.getElementById('_codeEdit').value = customer.code
                document.getElementById("_precioTotalEdit").textContent = `$${formateado} COP`
                document.getElementById("_priceNoTaxesEdit").textContent = `$${formateado} COP`
                document.getElementById('_typeEdit').value = customer.type
                document.getElementById('_unitEdit').value = "Unidad"
                customerDiv.innerHTML = ``;
                resultDiv.appendChild(customerDiv);
                resultDiv.style.display = 'block'; // Asegurarse de que el div se muestre
                _noFound.style.display = 'none';
                _yesFound.style.display = '';
                _empiezaound.style.display = 'none';
                document.getElementById('form_buttons').style.display = 'none',
                document.getElementById('form_buttonsActualizar').style.display = ''
                barcodeInput.value = ''; // Limpia el campo después de 2 segundos sin nueva entrada
                _maincontainerEdit.style.display = 'flex'
            });
        } else {
            resultDiv.style.display = 'none'; // Ocultar el div si no se encuentran clientes
            _maincontainer.style.display = 'none'; // Ocultar el div si no se encuentran clientes
            _noFound.style.display = '';
            _yesFound.style.display = 'none';
            _empiezaound.style.display = 'none';
    
            _barcodeEdit.value = barcodeInput.value
            document.getElementById('_nameEdit').value = ""
            document.getElementById('_categorityEdit').value = ""
            document.getElementById('_precioEdit').value = ""
            document.getElementById('_codeEdit').value =Math.round(_coderesit * 100) / 100
            document.getElementById("_precioTotalEdit").textContent = "$- COP"
            document.getElementById("_priceNoTaxesEdit").textContent = "$- COP"
            barcodeInput.value = ''; // Limpia el campo después de 2 segundos sin nueva entrada
            document.getElementById('form_buttons').style.display = ''
            document.getElementById('form_buttonsActualizar').style.display = 'none',

            _maincontainerEdit.style.display = 'flex';
        }
    }else{
    document.getElementById('form_buttons').style.display = 'none';
    _empiezaound.style.display = 'none';
    resultDiv.style.display = 'none'; // Ocultar el div si no se encuentran clientes
    _maincontainer.style.display = 'none'; // Ocultar el div si no se encuentran clientes
    _noFound.style.display = 'none';
    _yesFound.style.display = 'none';
    document.getElementById('_denuevoFound').style.display = '';
    document.getElementById('_maincontainerEdit').style.display = 'none'
    document.getElementById('form_buttonsActualizar').style.display = 'none'
    _verificador = true;

    }

}
window.onload = fetchCustomers;