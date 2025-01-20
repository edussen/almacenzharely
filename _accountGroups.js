let authSuccess = true;  // Esto debería ser el resultado de una validación de autenticación real
let authResponse = {};    // Este objeto debería ser la respuesta de la autenticación
let token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExNDQzRDg2OUYxMzgwODlEREUwOTdENTNBN0YxNzVCNkQwNzIxNzdSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkVVUTlocDhUZ0luZDRKZlZPbjhYVzIwSElYYyJ9.eyJuYmYiOjE3MzU2MTMxMjIsImV4cCI6MTczODIwNTEyMiwiaXNzIjoiaHR0cDovL21zLXNlY3VyaXR5OjUwMDAiLCJhdWQiOiJodHRwOi8vbXMtc2VjdXJpdHk6NTAwMC9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiJTaWlnb0FQSSIsInN1YiI6IjIwNDg2ODAiLCJhdXRoX3RpbWUiOjE3MzU2MTMxMjIsImlkcCI6ImxvY2FsIiwibmFtZSI6ImVsaWFuYV9tYXRldXM2QGhvdG1haWwuY29tIiwibWFpbF9zaWlnbyI6ImVsaWFuYV9tYXRldXM2QGhvdG1haWwuY29tIiwiY2xvdWRfdGVuYW50X2NvbXBhbnlfa2V5IjoiRkxPUkVaQU5HVUxPTUFSSUVMQSIsInVzZXJzX2lkIjoiMTc3IiwidGVuYW50X2lkIjoiMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDk4MDA0MiIsInVzZXJfbGljZW5zZV90eXBlIjoiMCIsInBsYW5fdHlwZSI6IjciLCJ0ZW5hbnRfc3RhdGUiOiIxIiwibXVsdGl0ZW5hbnRfaWQiOiIxMzE3IiwiY29tcGFuaWVzIjoiMCIsImFwaV9zdWJzY3JpcHRpb25fa2V5IjoiZWZlOTFjNzk5ZTAyNDA0MDk0ZDYwYTY3NzAwYWZjMzUiLCJhcGlfdXNlcl9jcmVhdGVkX2F0IjoiMTczNDg5NzU0NCIsImFjY291bnRhbnQiOiJmYWxzZSIsImp0aSI6IkJGRjg5Q0ZEODlDRkM4NUMzMjNERDJDNjQyQkMzQTNDIiwiaWF0IjoxNzM1NjEzMTIyLCJzY29wZSI6WyJTaWlnb0FQSSJdLCJhbXIiOlsiY3VzdG9tIl19.VrYYdPUdeUREK9jZfzg8uYGQYUxDxSQl8HnsKuJDaIgGjX5mDIPYchCjZcB3VdJvuLElC5J8oifoqQGOQrBdttFrDrJsj1Oo8vvvDcHSuvhz6GaHLa9HuDd6RoWrtbSDeRKReffc6Ft48V_ActfM783etIr35ok_Ixc4kE7paoijvN4hOo5W50iV6wTb-ns50RN7JBWSQAxNiMiA1g-Ucrxh5oTJ1aDGFpkNv7WqtQpdhyyJCkyp48jwVUdpQWSPvXnTCU9PXjupXaQvIiPiL9-Vi1uMnColNBTlmQw3DDdo7o6nX74D-CROyYRUoyFFNcpqLcS0oJ9ip0jofZYEbQ"
let url_account_groups = "https://cors-anywhere.herokuapp.com/https://api.siigo.com/v1/account-groups";  // URL de la API para obtener los grupos

// Si la autenticación fue exitosa, realizamos la solicitud para obtener los grupos de cuenta
if (authSuccess) {
    try {
        const headers = {
            "Authorization": "Bearer " + token,
            "Accept": "application/json",
            "Partner-Id": "POS"
        };

        const request = {
            method: "GET",
            headers: headers
        };

        // Usamos fetch para hacer la solicitud HTTP
        fetch(url_account_groups, request)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    // Si la respuesta es exitosa, parseamos el cuerpo JSON
                    response.json().then(accountGroups => {
                        console.log("Grupos de cuentas obtenidos exitosamente:");
                        const selectElement = document.getElementById('_categorityEdit');

                        // Recorre el array y agrega los nombres al select
                        accountGroups.forEach(item => {
                            const option = document.createElement('option');
                            option.value = item.id; // Puedes usar el ID como valor del option
                            option.textContent = item.name;
                            selectElement.appendChild(option);
                        });
                        console.log(accountGroups);  // Aquí puedes manejar los grupos de cuentas según lo necesites
                    }).catch(error => {
                        console.warn("Error al parsear la respuesta JSON:", error);
                    });
                } else {
                    // Si el código de estado no es 200, mostramos el error
                    console.warn("Error al obtener los grupos de cuentas:", response.status, response.statusText);
                }
            })
            .catch(error => {
                // Si la solicitud HTTP falla
                console.warn("Error al realizar la solicitud:", error);
            });

    } catch (error) {
        // Si hay un error en el bloque try-catch, lo mostramos
        console.warn("Error en el bloque try-catch:", error);
    }
}
