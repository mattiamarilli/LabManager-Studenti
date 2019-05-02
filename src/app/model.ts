export class AuthUser {
    id:number;
    nome:string
    cognome:string;
    id_classe:number;
    classe:number;
    id_gruppo:number;
    token:string;
    message?:string;
    code?:number;
}

export class Membro{
    id_studente:number;
    nome:string;
    cognome:string;
}

export class Utensile{
    id_utensile:number;
    nome:string;
    id_categoria:number;
    categoria:string;
}
