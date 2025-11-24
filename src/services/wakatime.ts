const WAKATIME_API_KEY = import.meta.env.VITE_WAKATIME_API_KEY;
const BASE_URL = 'https://wakatime.com/api/v1';

export interface WakaTimeStats {
    data: {
        categories: Array<{
            name: string;
            percent: number;
            digital: string;
            hours: number;
            minutes: number;
        }>;
        languages: Array<{
            name: string;
            percent: number;
            digital: string;
            hours: number;
            minutes: number;
        }>;
        daily_average: number;
        total_seconds: number;
    };
}

export interface WakaTimeSummary {
    data: Array<{
        grand_total: {
            digital: string;
            hours: number;
            minutes: number;
            total_seconds: number;
        };
        languages: Array<{
            name: string;
            percent: number;
            digital: string;
            hours: number;
            minutes: number;
            total_seconds: number;
        }>;
    }>;
}

export const wakaTimeService = {
    async getStats(range: 'last_7_days' | 'last_30_days' | 'last_6_months' | 'last_year' = 'last_7_days') {
        try {
            const response = await fetch(`${BASE_URL}/users/current/stats/${range}`, {
                headers: {
                    'Authorization': `Bearer ${WAKATIME_API_KEY}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch WakaTime stats');
            }

            const data: WakaTimeStats = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching WakaTime stats:', error);
            return null;
        }
    },

    async getSummaries(start: string, end: string) {
        try {
            const response = await fetch(
                `${BASE_URL}/users/current/summaries?start=${start}&end=${end}`,
                {
                    headers: {
                        'Authorization': `Bearer ${WAKATIME_API_KEY}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch WakaTime summaries');
            }

            const data: WakaTimeSummary = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching WakaTime summaries:', error);
            return null;
        }
    },

    // Get last 7 days of activity for the chart
    async getWeeklyActivity() {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 6);

        const startStr = start.toISOString().split('T')[0];
        const endStr = end.toISOString().split('T')[0];

        const summaries = await this.getSummaries(startStr, endStr);

        if (!summaries) return null;

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return summaries.data.map((day, index) => {
            const date = new Date(start);
            date.setDate(date.getDate() + index);
            return {
                day: days[date.getDay()],
                hours: parseFloat((day.grand_total.total_seconds / 3600).toFixed(1)),
            };
        });
    },
};
