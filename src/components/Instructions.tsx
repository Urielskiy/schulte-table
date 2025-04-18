import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const Instructions: React.FC = () => {
    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3, maxWidth: '800px', mx: 'auto' }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <strong>Таблиця Шульте</strong> — це тренажер для розвитку:
                </Typography>
                <Typography component="ul" sx={{ pl: 2 }}>
                    <li>швидкочитання,</li>
                    <li>периферійного зору,</li>
                    <li>концентрації уваги,</li>
                    <li>зорового сприйняття.</li>
                </Typography>
                <Typography paragraph sx={{ mt: 2 }}>
                    Таблиця містить числа, розміщені у випадковому порядку в квадратному полі. 
                    Ваше завдання — знаходити числа по порядку (від 1 до максимального) якнайшвидше 
                    <strong> без руху голови</strong> та очей.
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    🔸 Як правильно працювати з таблицею:
                </Typography>
                <Typography paragraph>
                    Очі розслаблені
                </Typography>
                <Typography component="ol" sx={{ pl: 2 }}>
                    <li><strong>Поставте погляд у центр таблиці.</strong></li>
                    <li><strong>Не рухайте головою.</strong> Лише м'якими очима шукайте наступне число.</li>
                    <li><strong>Зберігайте фокус.</strong> Намагайтеся помічати числа по краях, не переводячи погляд.</li>
                    <li><strong>Тренуйтеся регулярно</strong> — поступово збільшуйте розмір таблиці.</li>
                </Typography>
            </Box>

            <Box>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    🔹 Як користуватись тренажером:
                </Typography>
                <Typography component="ol" sx={{ pl: 2 }}>
                    <li><strong>Оберіть розмір таблиці</strong> — від 4x4 до 10x10. (Починати рекомендуєм з 4x4 або 5x5)</li>
                    <li><strong>(Опційно)</strong> Увімкніть <em>кольоровий режим</em> (доступний з 7x7), щоб ускладнити завдання.</li>
                    <li><strong>(Опційно)</strong> Активуйте <em>режим на час</em>, щоб тренуватись з обмеженням у 30 секунд.</li>
                    <li><strong>Натисніть "Старт"</strong> — таблиця згенерується випадковим чином.</li>
                    <li><strong>Натисніть "Стоп"</strong>, коли завершите вправу.</li>
                    <li><strong>Перегляньте історію результатів</strong> і середній час.</li>
                    <li><strong>Натисніть "Обнулити"</strong>, щоб очистити історію.</li>
                </Typography>
            </Box>
        </Paper>
    );
};

export default Instructions;
