import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import Layout from './views/Layout';


render(
    <RecoilRoot>
      <HashRouter>
        <SnackbarProvider
          maxSnack={5}
          autoHideDuration={3000}
          dense={false}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Layout />
        </SnackbarProvider>
      </HashRouter>
    </RecoilRoot>,
  document.getElementById('root')
);
