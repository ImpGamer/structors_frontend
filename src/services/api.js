const API_URL = import.meta.env.VITE_API_URL

export async function apiFetch(endpoint, options = {}, query_params = {}) {
    let Url_constructor = `${API_URL}${endpoint}`

    if (Object.keys(query_params).length > 0) {
        const cleanParams = clearParams(query_params)

        if (Object.keys(cleanParams).length > 0) {
            const urlParams = new URLSearchParams(cleanParams)
            Url_constructor += `?${urlParams.toString()}`
        }
    }

    try {
        const complete_URL = new URL(Url_constructor)
        console.log(`Endpoint called: ${complete_URL}`);

        const res = await fetch(complete_URL, {
            ...options,
            headers: {
                ...(options.body && { 'Content-Type': 'application/json' }),
            },
        })

        if (!res.ok) {
            const error = await res.json()
            console.log(error);

            throw new Error(
                `An error has occurred on the server (Error Message: ${error.message})`
            )
        }

        return await res.json();
    } catch (e) {
        console.error("No connection to the server ", e.message);
        throw new Error("No connection to the server.");
    }
}

function clearParams(params) {
    return Object.fromEntries(
        Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== null && v !== '')
            .map(([k, v]) => [
                k,
                typeof v === 'object' ? JSON.stringify(v) : v
            ])
    )
}

