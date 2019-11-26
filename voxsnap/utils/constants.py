from django.utils.translation import ugettext_lazy as _


class BloggingPlatforms:
    WORDPRESS = 'W'
    HTML = 'H'
    MEDIUM = 'M'
    DRUPAL = 'D'
    SQUARESPACE = 'S'
    OTHER = 'O'

    CHOICES = ((WORDPRESS, 'Wordpress'), (HTML, 'HTML'), (MEDIUM, 'Medium'),
               (DRUPAL, 'Drupal'), (SQUARESPACE, 'Squarespace'), (OTHER,
                                                                  'Other'))


class AdditionalServices:
    ITUNES = 'itunes_podcasts'
    AMAZON_ALEXA = 'amazon_alexa'
    GOOGLE = 'google_podcasts'

    SERVICES_ENABLED = [ITUNES, AMAZON_ALEXA, GOOGLE]

    PRICES = {
        ITUNES: 75,
        AMAZON_ALEXA: 0,
        GOOGLE: 50,
    }

    DESCRIPTIONS = {
        ITUNES: 'Podcast distribution',
        AMAZON_ALEXA: 'Amazon Alexa integration',
        GOOGLE: 'Google Podcasts integration',
    }


class PackageTypes:
    ONE_TIME = 'o'
    MONTHLY = 'm'
    ANNUAL = 'a'

    # turn these into frozenset so we can look things up?
    PACK_TYPES = ((ANNUAL, 'Annual'), (MONTHLY, 'Monthly'), (ONE_TIME,
                                                             'One Time Order'))

    INCLUDED_NARRATIONS = (('starter', 4), ('advanced', 8), ('complete', 20))


PACKAGE_PLANS = {
    PackageTypes.ONE_TIME: {
        'additionalWordsPer10': {
            'dev': 'plan_Eob6txeRJ6EluA',
            'prod': 'plan_Eoazjx1fyg0YVS'
        },
        'bandwidthPerGB': {
            'dev': 'plan_Eob9T1BAHQ7QqF',
            'prod': 'plan_En5YVG1u3nxNW6'
        }
    },
    PackageTypes.MONTHLY: {
        'starter': {
            'dev': 'plan_EoCBP9MP4aE3ho'
        },
        'advanced': {
            'dev': 'plan_Eoat88pD6s6wbo'
        },
        'complete': {
            'dev': 'plan_Eoavvrh3KTRZ7J'
        }
    },
    PackageTypes.ANNUAL: {
        'starter': {
            'dev': 'plan_EoasXc834sTrTy'
        },
        'advanced': {
            'dev': 'plan_EoaunwHI6Q96LN'
        },
        'complete': {
            'dev': 'plan_EoavEEvJ5XQ0P1'
        }
    }
}


class PackageTypes:
    ONE_TIME = 'o'
    MONTHLY = 'm'

    PACK_TYPES = ((MONTHLY, 'Monthly'), (ONE_TIME, 'One Time Order'))

    PACK_NARRATIONS_NUM = ((1, "1"), (5, "5"), (10, "10"), (20, "20+"))


# should be ordered by descending items number
PACKAGE_PRICES = {
    PackageTypes.ONE_TIME: {
        20: 39,
        10: 41,
        5: 43,
        1: 45,
    },
    PackageTypes.MONTHLY: {
        20: 37,
        10: 39,
        5: 41,
        1: 43,
    }
}

# prices for each additional word in dollars
ADDITIONAL_WORDS_PRICES = {
    PackageTypes.ONE_TIME: {
        20: 0.048,
        10: 0.051,
        5: 0.053,
        1: 0.056,
    },
    PackageTypes.MONTHLY: {
        20: 0.046,
        10: 0.048,
        5: 0.051,
        1: 0.053,
    }
}

ORDER_REGISTRATION_MESSAGE_SUBJECT = _('Receipt for your Order from VoxSnap')
