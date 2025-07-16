import app from './app';
import { config } from './config/config';

app.listen(config.port, () => {
    console.log(`🚀 Profile service is running on port ${config.port}`);
});
