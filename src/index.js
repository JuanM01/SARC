import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import CargarDocumentos from './views/admin/doc/CargarDocumentos';
import VerDocumentos from './views/admin/doc/VerDocumentos';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import ResetPassword from 'views/auth/forgot/rpass';
ReactDOM.render(
	<ThemeEditorProvider>
		<ChakraProvider theme={theme}>
			<React.StrictMode>
				<ChakraProvider theme={theme}>
					<HashRouter>
						<Switch>
						<Route  exact path="/auth/forgot" component={ResetPassword} />
							<Route path={`/auth`} component={AuthLayout} />
							<Route path={`/admin`} component={AdminLayout} />
							<Route path={`/rtl`} component={RtlLayout} />
							
							<Route path="/cargar-documentos" component={CargarDocumentos} />
							<Route path="/ver-documentos" component={VerDocumentos} />
							<Redirect from='/' to='/auth' />
						</Switch>
					</HashRouter>
				</ChakraProvider>
			</React.StrictMode>
		</ChakraProvider>
	</ThemeEditorProvider>,
	document.getElementById('root')
);
