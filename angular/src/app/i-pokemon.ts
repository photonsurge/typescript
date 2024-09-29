export interface IPokemonName{
    name:string;
    url:string;
    id?:string;
    data?:IPokemon;
}
export interface IPokemonListResponse{
    count:number;
    next:string|null;
    previous:string|null;
    results:IPokemonName[];
}

export interface IAbility {
    name: string;
    url: string;
}

export interface IAbilityDetail {
    ability: IAbility;
    is_hidden: boolean;
    slot: number;
}

export interface ICry {
    latest: string;
    legacy: string;
}

export interface IForm {
    name: string;
    url: string;
}

export interface IVersion {
    name: string;
    url: string;
}

export interface IGameIndex {
    game_index: number;
    version: IVersion;
}

export interface IItem {
    name: string;
    url: string;
}

export interface IVersionDetail {
    rarity: number;
    version: IVersion;
}

export interface IHeldItem {
    item: IItem;
    version_details: IVersionDetail[];
}

export interface IMoveLearnMethod {
    name: string;
    url: string;
}

export interface IVersionGroup {
    name: string;
    url: string;
}

export interface IVersionGroupDetail {
    level_learned_at: number;
    move_learn_method: IMoveLearnMethod;
    version_group: IVersionGroup;
}

export interface IMove {
    name: string;
    url: string;
}

export interface IMoveDetail {
    move: IMove;
    version_group_details: IVersionGroupDetail[];
}

export interface ISpecies {
    name: string;
    url: string;
}

export interface ISprite {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
}

export interface IOtherSprites {
    [key: string]: ISprite;
}

export interface IGenerationSprites {
    [key: string]: {
        [key: string]: ISprite;
    };
}

export interface ISprites {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: any;
    versions: any;
}

export interface IStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface IType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface IPokemon {
    abilities: IAbilityDetail[];
    base_experience: number;
    cries: ICry;
    forms: IForm[];
    game_indices: IGameIndex[];
    height: number;
    held_items: IHeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: IMoveDetail[];
    name: string;
    order: number;
    past_abilities: IAbilityDetail[];
    past_types: IType[];
    species: ISpecies;
    sprites: ISprites;
    stats: IStat[];
    types: IType[];
    weight: number;
}
