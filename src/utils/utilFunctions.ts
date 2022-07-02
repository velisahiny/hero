import {IHero} from "../heroes/HeroPage";

export const filterByAttributes = (tokensData: Map<number, IHero>, filterMap: Map<string, any>) => {
    const filteredOutData = new Map(tokensData);
    Array.from(filterMap.entries()).forEach(filter => {
        const [filterKey, filterValue] = filter;
        Array.from(tokensData.entries()).forEach(entry => {
            entry[1].attributes.forEach((attribute: any) => {
                if (attribute.display_type !== "number") {
                    if (attribute.trait_type === filterKey) {
                        if (filterKey === "name"  ) {
                            !attribute.value.toLowerCase().includes(filterValue.toLowerCase()) && filteredOutData.delete(entry[0]);
                        } else{
                            attribute.value.toLowerCase() !== filterValue.toLowerCase() && filteredOutData.delete(entry[0]);
                        }
                    }
                } else {
                    if (attribute.trait_type === filterKey && attribute.value.toString() !== filterValue) {
                        filteredOutData.delete(entry[0]);
                    }
                }
            });
        });
    });
    return filteredOutData;
}

export const filterReducer = (state: Map<string, any>, action: any): Map<string, any> => {
    switch (action.type) {
        case "add":
            return new Map(state.set(action.trait_type, action.payload));
        case "remove":
            state.delete(action.trait_type);
            return new Map(state);
        default:
            return new Map(state);
    }
}

export const tokenReducer = (state: Map<number, IHero>, action: any): Map<number, IHero> => {
    switch (action.type) {
        case "bulk_add":
            action.payload.forEach((data: any) => {
                state.set(data.id, data);
            })
            return new Map(state);
        case "add":
            state.set(action.id, action.payload);
            return new Map(state);
        case "remove":
            state.delete(action.id);
            return new Map(state);
        default:
            return new Map(state);
    }
}


