import { AlertProvider } from './context/alert.provider';
import MyRoutes from './routes';

function App() {
  return (
    <AlertProvider>
      <MyRoutes />
    </AlertProvider>
  );
}

export default App;