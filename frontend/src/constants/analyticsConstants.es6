import moment from 'moment';

export const SelectPeriodConstants = [
    {
        label: 'Today',
        range: {
            'dt__gte': moment().startOf('day').format(),
            'dt__lt': moment().endOf('day').format()
        }
    },
    {
        label: 'Yesterday',
        range: {
            'dt__gte': moment().subtract(1, 'days').startOf('day').format(),
            'dt__lt': moment().subtract(1, 'days').endOf('day').format()
        }
    },
    {
        label: 'Last 7 days',
        range: {
            'dt__gte': moment().subtract(6, 'days').startOf('day').format(),
            'dt__lt': moment().endOf('day').format()
        }
    },
    {
        label: 'Last 30 days',
        range: {
            'dt__gte': moment().subtract(29, 'days').startOf('day').format(),
            'dt__lt': moment().endOf('day').format()
        }
    },
    {
        label: 'This Month',
        range: {
            'dt__gte': moment().startOf('month').startOf('day').format(),
            'dt__lt': moment().endOf('day').format()
        }
    },
    {
        label: 'Last Month',
        range: {
            'dt__gte': moment().subtract(1, 'month').startOf('month').startOf('day').format(),
            'dt__lt': moment().subtract(1, 'month').endOf('month').endOf('day').format()
        }
    }
];

export const analyticsDetailsTypes = [
    {
        label: 'NARRATIONS',
        tableColumnLabel: 'Post'
    },
    {
        label: 'SOURCES',
        tableColumnLabel: 'Source'
    },
    {
        label: 'GEOGRAPHY',
        tableColumnLabel: 'Country'
    },
    {
        label: 'SHARES',
        tableColumnLabel: 'Post'
    },
    {
        label: 'DEVICES',
        tableColumnLabel: 'Device'
    }
];