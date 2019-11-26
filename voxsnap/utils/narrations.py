import newspaper
from django.core.exceptions import ValidationError


def calculate_article_word_count(url):
    config = newspaper.Config()
    config.browser_user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) " \
                                "AppleWebKit/537.36 (KHTML, like Gecko) " \
                                "Chrome/64.0.3282.186 Safari/537.36"
    article = newspaper.Article(url, config=config)
    article.download()
    article.parse()

    if (len(article.text.split())) < 200:
        raise ValidationError('Could not find article')

    return len(article.text.split()) + len(article.title.split())
