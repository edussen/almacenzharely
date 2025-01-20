
async function createProduct() {
    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExNDQzRDg2OUYxMzgwODlEREUwOTdENTNBN0YxNzVCNkQwNzIxNzdSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkVVUTlocDhUZ0luZDRKZlZPbjhYVzIwSElYYyJ9.eyJuYmYiOjE3MzQ5MjM0MTMsImV4cCI6MTczNzUxNTQxMywiaXNzIjoiaHR0cDovL21zLXNlY3VyaXR5OjUwMDAiLCJhdWQiOiJodHRwOi8vbXMtc2VjdXJpdHk6NTAwMC9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJTaWlnb0FQSSIsInN1YiI6IjIwNDg2ODAiLCJhdXRoX3RpbWUiOjE3MzQ5MjM0MTMsImlkcCI6ImxvY2FsIiwibmFtZSI6ImVsaWFuYV9tYXRldXM2QGhvdG1haWwuY29tIiwibWFpbF9zaWlnbyI6ImVsaWFuYV9tYXRldXM2QGhvdG1haWwuY29tIiwiY2xvdWRfdGVuYW50X2NvbXBhbnlfa2V5IjoiRkxPUkVaQU5HVUxPTUFSSUVMQSIsInVzZXJzX2lkIjoiMTc3IiwidGVuYW50X2lkIjoiMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDk4MDA0MiIsInVzZXJfbGljZW5zZV90eXBlIjoiMCIsInBsYW5fdHlwZSI6IjciLCJ0ZW5hbnRfc3RhdGUiOiIxIiwibXVsdGl0ZW5hbnRfaWQiOiIxMzE3IiwiY29tcGFuaWVzIjoiMCIsImFwaV9zdWJzY3JpcHRpb25fa2V5IjoiZWZlOTFjNzk5ZTAyNDA0MDk0ZDYwYTY3NzAwYWZjMzUiLCJhcGlfdXNlcl9jcmVhdGVkX2F0IjoiMTczNDg5NzU0NCIsImFjY291bnRhbnQiOiJmYWxzZSIsImp0aSI6IkU0N0FFNTgxQ0E3NEQ4Njc4MzlBQ0I3RjQ0RTc4OEM5IiwiaWF0IjoxNzM0OTIzNDEzLCJzY29wZSI6WyJTaWlnb0FQSSJdLCJhbXIiOlsiY3VzdG9tIl19.iHtd73eKYUchSTaaGS5PJ1KBWxQvAiL0ZINtTiECesBG9Ip8e_w_BaTpxYCIqxw1MxIj77QVADjSaFC_6uOLqCKP00sHySsOSYh9ReRSkS0uVVclP5GQCs3R3B4FV7HMSzImQorb8zzwTUp5VRhB__n3HSIZ-lvEllPqkVFveFNLcrWBbLKBkx19iq7C3BoSziHX_FBJKQgezbA6ckIR3LB_ZL5tD5n2NA40GfSS7v2Gie6qfwhwNKjvsn0_ComrHjgmqyVLJWNzi7zG2ROB3c4B-np-e3Cc6XyOc7pXkawxDNuh2vjGAr7tygLiO7ljAWORw2iPpxQ8mhylwD7yHw"; // Coloca aquí tu token

    const productsUrl = "https://cors-anywhere.herokuapp.com/https://api.siigo.com/v1/products";
    const _codeEdit = document.getElementById("_codeEdit")
    const _categorityEdit = document.getElementById("_categorityEdit")
    const _barcodeEdit = document.getElementById("_barcodeEdit")
    const _precioEdit = document.getElementById("_precioEdit")
    const _nameEdit = document.getElementById("_nameEdit")
    let soundsucces = new Audio('images/Success.mp3');
    let sounderror = new Audio('images/error.mp3');
    const productsHeaders = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Partner-Id": "POS"
    };

    const productData = {
        code: _codeEdit.value,
        name: _nameEdit.value,
        description: "Producto de prueba generado por Boundless Studios.",
        stock_control: true,
        account_group: _categorityEdit.value,
        active: true,
        additional_fields: {
            barcode: _barcodeEdit.value
        },
        tax_included: false,
        type: "Product",
        prices: [
            {
                currency_code: "COP",
                price_list: [
                    {position: 1, value: _precioEdit.value}
                ]
            }
        ]
    };

    try {
        console.log(productData)
        const productJson = JSON.stringify(productData);

        const response = await fetch(productsUrl, {
            method: "POST",
            headers: productsHeaders,
            body: productJson
        });


        if (response.status === 201) {
            const createdProduct = await response.json();
            console.log("Producto creado exitosamente:", createdProduct);
            _cancelarverificacion()
            sumarCode()
            NuevoproductoCode([createdProduct])
            const barcodeInput = document.getElementById('barcodeInput').value = createdProduct.additional_fields.barcode;
            searchCustomer()
            mostrarError("¡Su producto ha sido creado exitosamente!", "success")
            soundsucces.play();
        } else {
            const errorData = await response.json();
            if (errorData?.Errors?.length > 0) {
                const { Code, Message } = errorData.Errors[0];
                console.log(`Error: ${Message}`);
            } else {
                console.log("Error desconocido.");
            }
        }
    } catch (error) {
        console.error("Error durante la solicitud:", error);
        const resultDiv = document.getElementById("result");
        console.log(`Error: ${error.message}`);
    }
}

async function updateProduct() {
    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExNDQzRDg2OUYxMzgwODlEREUwOTdENTNBN0YxNzVCNkQwNzIxNzdSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkVVUTlocDhUZ0luZDRKZlZPbjhYVzIwSElYYyJ9.eyJuYmYiOjE3MzQ5MjM0MTMsImV4cCI6MTczNzUxNTQxMywiaXNzIjoiaHR0cDovL21zLXNlY3VyaXR5OjUwMDAiLCJhdWQiOiJodHRwOi8vbXMtc2VjdXJpdHk6NTAwMC9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJTaWlnb0FQSSIsInN1YiI6IjIwNDg2ODAiLCJhdXRoX3RpbWUiOjE3MzQ5MjM0MTMsImlkcCI6ImxvY2FsIiwibmFtZSI6ImVsaWFuYV9tYXRldXM2QGhvdG1haWwuY29tIiwibWFpbF9zaWlnbyI6ImVsaWFuYV9tYXRldXM2QGhvdG1haWwuY29tIiwiY2xvdWRfdGVuYW50X2NvbXBhbnlfa2V5IjoiRkxPUkVaQU5HVUxPTUFSSUVMQSIsInVzZXJzX2lkIjoiMTc3IiwidGVuYW50X2lkIjoiMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDk4MDA0MiIsInVzZXJfbGljZW5zZV90eXBlIjoiMCIsInBsYW5fdHlwZSI6IjciLCJ0ZW5hbnRfc3RhdGUiOiIxIiwibXVsdGl0ZW5hbnRfaWQiOiIxMzE3IiwiY29tcGFuaWVzIjoiMCIsImFwaV9zdWJzY3JpcHRpb25fa2V5IjoiZWZlOTFjNzk5ZTAyNDA0MDk0ZDYwYTY3NzAwYWZjMzUiLCJhcGlfdXNlcl9jcmVhdGVkX2F0IjoiMTczNDg5NzU0NCIsImFjY291bnRhbnQiOiJmYWxzZSIsImp0aSI6IkU0N0FFNTgxQ0E3NEQ4Njc4MzlBQ0I3RjQ0RTc4OEM5IiwiaWF0IjoxNzM0OTIzNDEzLCJzY29wZSI6WyJTaWlnb0FQSSJdLCJhbXIiOlsiY3VzdG9tIl19.iHtd73eKYUchSTaaGS5PJ1KBWxQvAiL0ZINtTiECesBG9Ip8e_w_BaTpxYCIqxw1MxIj77QVADjSaFC_6uOLqCKP00sHySsOSYh9ReRSkS0uVVclP5GQCs3R3B4FV7HMSzImQorb8zzwTUp5VRhB__n3HSIZ-lvEllPqkVFveFNLcrWBbLKBkx19iq7C3BoSziHX_FBJKQgezbA6ckIR3LB_ZL5tD5n2NA40GfSS7v2Gie6qfwhwNKjvsn0_ComrHjgmqyVLJWNzi7zG2ROB3c4B-np-e3Cc6XyOc7pXkawxDNuh2vjGAr7tygLiO7ljAWORw2iPpxQ8mhylwD7yHw"; // Coloca aquí tu token
    let soundsucces = new Audio('images/Success.mp3');
    let sounderror = new Audio('images/error.mp3');
    const productId = document.getElementById("_idEdit");
    const productsUrl = `https://cors-anywhere.herokuapp.com/https://api.siigo.com/v1/products/${productId.value}`;
    const _codeEdit = document.getElementById("_codeEdit");
    const _categorityEdit = document.getElementById("_categorityEdit");
    const _barcodeEdit = document.getElementById("_barcodeEdit");
    const _precioEdit = document.getElementById("_precioEdit");
    const _nameEdit = document.getElementById("_nameEdit");

    const productsHeaders = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Partner-Id": "POS"
    };

    const productData = {
        code: _codeEdit.value,
        name: _nameEdit.value,
        description: "Producto actualizado desde Boundless Studios.",
        stock_control: true,
        account_group: _categorityEdit.value,
        active: true,
        additional_fields: {
            barcode: _barcodeEdit.value
        },
        tax_included: false,
        type: "Product",
        prices: [
            {
                currency_code: "COP",
                price_list: [
                    { position: 1, value: _precioEdit.value }
                ]
            }
        ]
    };

    try {
        console.log(productData);
        const productJson = JSON.stringify(productData);

        const response = await fetch(productsUrl, {
            method: "PUT", // Cambiado de POST a PUT
            headers: productsHeaders,
            body: productJson
        });

        if (response.status === 200) { // PUT usualmente devuelve 200
            const updatedProduct = await response.json();
            console.log("Producto actualizado exitosamente:", updatedProduct);
            const barcodeInput = document.getElementById('barcodeInput').value = updatedProduct.additional_fields.barcode;

            _cancelarverificacion()
            _UpdateProduct(updatedProduct.id, updatedProduct.name, updatedProduct.code, updatedProduct.account_group.id, updatedProduct.additional_fields.barcode, updatedProduct.prices[0].price_list[0].value)
            searchCustomer()
            mostrarError("¡Su producto ha sido actualizado exitosamente!", "success")
            soundsucces.play();

        } else {
            const errorData = await response.json();
            if (errorData?.Errors?.length > 0) {
                const { Code, Message } = errorData.Errors[0];
                console.log(`Error: ${Message}`);
            } else {
                console.log("Error desconocido.");
            }
        }
    } catch (error) {

        mostrarError(`Error: ${error}`)
        sounderror.play()
        console.error("Error durante la solicitud:", error);
        console.log(`Error: ${error.message}`);
    }
}


function _priceChanged() {
    const _precioEdit = document.getElementById("_precioEdit")
    const _precioTotalEdit = document.getElementById("_precioTotalEdit")
    const _priceNoTaxesEdit = document.getElementById("_priceNoTaxesEdit")
    const numero = _precioEdit.value
    const formateado = numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Si el valor contiene caracteres no numéricos
    if (_precioEdit.value === "") {
        _precioTotalEdit.textContent = "$- COP"; 
        _priceNoTaxesEdit.textContent = _precioTotalEdit.textContent
    } else {
        if (/\D/.test(_precioEdit.value)) {
            _precioTotalEdit.textContent = "$- COP";
            _priceNoTaxesEdit.textContent = _precioTotalEdit.textContent
        } else {
            _precioTotalEdit.textContent = `$${formateado} COP`;
            _priceNoTaxesEdit.textContent = _precioTotalEdit.textContent
        }
    }

}