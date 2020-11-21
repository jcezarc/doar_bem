CREATE TABLE Pessoa(
	cpf_cnpj VARCHAR(14) PRIMARY KEY,
	nome VARCHAR(200) NOT NULL,
	CEP CHAR(8),
	endereco VARCHAR(255),
	foto varchar(255),
	email VARCHAR(100) UNIQUE,
	senha VARCHAR(40)
);
CREATE TABLE Necessidade(
	/*
	Doação
	Campanha
	*/
	id char(36) PRIMARY KEY,
	descricao VARCHAR(100),
	quantidade FLOAT,
	dia DATE,
	pessoa VARCHAR(14) REFERENCES Pessoa(cpf_cnpj),
	hashtags VARCHAR(255),
	logotipo varchar(255)
);
CREATE TABLE Mensagem(
	id SERIAL PRIMARY KEY,
	dia DATE,
	de  VARCHAR(14) REFERENCES Pessoa(cpf_cnpj),
	para  VARCHAR(14) REFERENCES Pessoa(cpf_cnpj),
	conteudo VARCHAR(255),
	campanha char(36) REFERENCES Necessidade(id),
	lida char(1),
	quantidade FLOAT
);
