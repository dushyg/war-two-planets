import { App } from './app';
import { initializeTypeDiContainer } from './typediConfig';

// Initialize Dependency Injection Container
initializeTypeDiContainer();

// start the application
new App().start();
