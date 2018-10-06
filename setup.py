from setuptools import setup, find_packages

__version__ = '0.1'

setup(
    name='pathfinder',
    version=__version__,
    author='Ben Wu',
    url='https://github.com/Ben-Wu/Spotify-Pathfinder',
    packages=find_packages(),
    install_requires=[
        'Flask==1.0.2',
        'Flask-SocketIO==3.0.2',
        'requests==2.19.1',
    ]
)
