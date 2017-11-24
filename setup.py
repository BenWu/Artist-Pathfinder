from setuptools import setup, find_packages

__version__ = '0.1'

setup(
    name='pathfinder',
    version=__version__,
    url='https://github.com/Ben-Wu/Spotify-Pathfinder',
    packages=find_packages(),
    install_requires=[
        'Flask==0.12.2',
        'requests==2.18.4',
    ]
)
