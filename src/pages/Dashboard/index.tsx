import React, { useState, FormEvent } from 'react';
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
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [newRepo, setNewRepo] = useState('');

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
    ): Promise<void> {

    event.preventDefault();

    const response = await api.get<Repository>(`repos/${newRepo}`);

    const repository = response.data;

    setRepositories([...repositories, repository]);
    setNewRepo("");
  }

  return (
    <>
    <S.Img src={logoImg} />
    <S.ImgTitle src={logoImgTitle} />

    <S.Title>Explore repositórios no Github</S.Title>

    <S.Form onSubmit={handleAddRepository}>
      <input
        value={newRepo}
        onChange={(e) =>
        setNewRepo(e.target.value)}
        placeholder={"Digite o nome do repositório"}
      />
      <button type={"submit"}>Pesquisar</button>
    </S.Form>

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
