import { CidadeDTO } from "./cidade.dto";

export interface EnderecoDTO {

    id : string;
    logradouro : string;
    numero : string;
    complemento : string;
    bairro : string;
    quarteirao : string;
    cidade : CidadeDTO;
}