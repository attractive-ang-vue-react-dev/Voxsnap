export const starterServices = [
    {
        title: 'Podcasts',
        body: 'Distribution to all the popular podcasting apps'
    },
    {
        title: 'Audio Hub Page',
        body: 'Your own dedicated content page'
    },
    {
        title: 'VoxSnap Library',
        body: 'Placement online and our Amazon Alexa app'
    },
    {
        title: 'Analytics',
        body: 'Daily engagement and consumption metrics'
    }
];

export const advancedServices = [
    {
        title: 'Podcasts',
        body: 'Distribution to all the popular podcasting apps'
    },
    {
        title: 'Audio Hub Page',
        body: 'Your own dedicated content page'
    },
    {
        title: 'VoxSnap Library',
        body: 'Placement online and our Amazon Alexa app'
    },
    {
        title: 'Amazon Alexa Briefings',
        body: 'Your company’s branded Alexa daily briefings'
    },
    {
        title: 'Google Home News',
        body: 'Your company’s branded Google Home daily news'
    },
    {
        title: 'Advanced Analytics',
        body: 'Daily advanced engagement and consumption metrics'
    }
];

export const completeServices = [
    {
        title: 'Podcasts',
        body: 'Distribution to all the popular podcasting apps'
    },
    {
        title: 'Audio Hub Page',
        body: 'Your own dedicated content page'
    },
    {
        title: 'VoxSnap Library',
        body: 'Placement online and our Amazon Alexa app'
    },
    {
        title: 'Amazon Alexa Briefing + Skill',
        body: 'Your company’s branded Alexa Skill and daily briefings'
    },
    {
        title: 'Google Home News + Action',
        body: 'Your company’s branded Google Home Action and daily news'
    },
    {
        title: 'Voice Calls to Action',
        body: 'Email me more info, schedule a consultation...'
    },
    {
        title: 'Third Party Data Integration',
        body: 'Integrate data with your marketing platform'
    },
    {
        title: 'Complete Analytics',
        body: 'Daily complete engagement and consumption metric'
    }
];

export const packages = [
    {
        label: 'Starter',
        value: 'starter',
        prices: {
            'monthly': {
                label: 'Monthly',
                value: 'm',
                narrationsCount: 4,
                packagePrice: 645,
                additionalPrice: 0.056,
                additionalServices: starterServices
            },
            'annual': {
                label: 'Annual',
                value: 'a',
                narrationsCount: 4,
                packagePrice: 600,
                additionalPrice: 0.056,
                additionalServices: starterServices
            }
        }
    },
    {
        label: 'Advanced',
        value: 'advanced',
        prices: {
            'monthly': {
                label: 'Monthly',
                value: 'm',
                narrationsCount: 8,
                packagePrice: 2585,
                additionalPrice: 0.056,
                additionalServices: advancedServices
            },
            'annual': {
                label: 'Annual',
                value: 'a',
                narrationsCount: 8,
                packagePrice: 2500,
                additionalPrice: 0.056,
                additionalServices: advancedServices
            }
        }
    },
    {
        label: 'Complete',
        value: 'complete',
        prices: {
            'monthly': {
                label: 'Monthly',
                value: 'm',
                narrationsCount: 20,
                packagePrice: 5500,
                additionalPrice: 0.056,
                additionalServices: completeServices
            },
            'annual': {
                label: 'Annual',
                value: 'a',
                narrationsCount: 20,
                packagePrice: 5000,
                additionalPrice: 0.056,
                additionalServices: completeServices
            }
        }
    }
];


//deprecated from earlier payment model
export const additionalServices = [
    {
        value: 'itunes_podcasts',
        name: 'Podcasting',
        description: 'Setup of your podcast on iTunes, Google and TuneIn',
        price: 75
    }
];

export const bloggingPlatforms = [
    {
        label: 'WordPress',
        value: 'W'
    },
    {
        label: 'Medium',
        value: 'M'
    },
    {
        label: 'Drupal',
        value: 'D'
    },
    {
        label: 'Squarespace',
        value: 'S'
    },
    {
        label: 'HTML',
        value: 'H'
    },
    {
        label: 'Other',
        value: 'O'
    }
];

export const wordsInPackage = 1500;
