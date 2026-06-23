import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { RepoExplorer } from './pages/RepoExplorer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
        <Header />
        <main>
          <RepoExplorer />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
