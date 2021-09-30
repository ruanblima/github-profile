import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/github_logo.png';
import logoImgTitle from '../../assets/github_logo_title.svg';

import api from '../../services/api'

import * as S from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {

  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
      );
  },[repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
    ): Promise<void> {

    event.preventDefault();

    if (!newRepo) {
      return setInputError('Digite o autor/nome do repositório');
    }

    try {

      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setInputError("");
      return setNewRepo("");

    } catch (err) {
      return setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
    <S.Img src={logoImg} />
    <S.ImgTitle src={logoImgTitle} />

    <S.Title>Explore repositórios no Github</S.Title>

    <S.Form hasError={!!inputError} onSubmit={handleAddRepository}>
      <input
        value={newRepo}
        onChange={(e) =>
        setNewRepo(e.target.value)}
        placeholder={"Digite o nome do repositório"}
      />
      <button type={"submit"}>Pesquisar</button>
    </S.Form>
    {inputError && <S.Error>{inputError}</S.Error>}

    <S.Repositories>
      {repositories.map(repository => (
        <a key={repository.full_name} href={"test"}>
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
        />
        <div>
          <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>

        <FiChevronRight size={20} />

      </a>
      ))}

    </S.Repositories>
    </>
  );
};

export default Dashboard;
