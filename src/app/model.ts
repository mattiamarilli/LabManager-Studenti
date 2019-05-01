export class AuthUser {
    id:number;
    nome:string
    cognome:string;
    id_classe:number;
    classe:number;
    id_gruppo:number;

}

export class Membro{
    id:number;
    nome:string;
    cognome:string;
}

export class Utensile{
    id_Utensile:number;
    nome:string;
    segnala:boolean;
    id_categoria:number;
    categoria:string;
}