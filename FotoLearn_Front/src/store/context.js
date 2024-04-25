import React, {useState, useEffect} from "react";
import getState from "./flux";

export const Context = React.createContext(null); //Crea el contexto con null como valor inicial para componentes sin acceso al proovedor

//Esta funcion inyecta el almacenamiento global a cualquier componente o pagina

const injectContext = (PassedComponent) =>{
    return (props) => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: {...state.actions}
                    }),
            })
        );

        useEffect(() => { //Aqui va cualquier funcion del store que necesitemos cada vez que arranca la aplicacion
        /**
         This function is the equivalent to "window.onLoad", it only runs once on the entire application lifetime
         you should do your ajax requests or fetch api requests here. Do not use setState() to save data in the
         store, instead use actions, like this:
         state.actions.getAuthenticatedUser();
        **/

        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        )
    }
}

export default injectContext;