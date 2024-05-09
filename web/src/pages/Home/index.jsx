import { FiTruck, FiTag, FiShoppingCart } from 'react-icons/fi';

import { Container } from "./styles";
import { Feature } from '../../components/Feature';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import { USER_ROLE } from "../../utils/roles";

export function Home() {

  //Recuperamos as informações do usuário
  const { user } = useAuth();

  return (
    <Container>
      <Header />

      <main>
        <Feature title="Produto" icon={FiTag} to="/product" />
        {/* Filtrando as opções de acordo com o perfil do usuário */}
        { [USER_ROLE.ADMIN].includes(user.role) && <Feature title="Fornecedores" icon={FiTruck} to="/suppliers" /> }
        { [USER_ROLE.ADMIN, USER_ROLE.SALE].includes(user.role) && <Feature title="Relatório de vendas" icon={FiShoppingCart} to="/sales-report" />}
      </main>
    </Container>
  )
}