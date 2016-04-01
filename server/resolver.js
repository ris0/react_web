export function extractDataFn(component) {
    if (component.WrappedComponent && component.WrappedComponent.fetchData) {
        return component.WrappedComponent.fetchData;
    } else if (component.fetchData) {
        return component.fetchData;
    } else {
        return null;
    }
}

export function resolve(components) {
    return components.reduce((results, componentOrComponents) => {
        if (typeof componentOrComponents === 'object') {
            for (obj of componentOrComponents) {
                const dataFn = extractDataFn(obj);
                results.push(dataFn);
            }
        } else {
            const dataFn = extractDataFn(componentOrComponents);
            return dataFn ? results.concat(dataFn) : results;
        }
    }, []);
}

export function invoke(fns = [], ...args) {
    return fns.map((fn) => fn(...args));
}

export default function resolver(components, ...args) {
    return invoke(resolve(components), ...args);
}
