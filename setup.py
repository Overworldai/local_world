from setuptools import setup

setup(
    name="LocalWorld",
    version="0.1.0",
    py_modules=["client"],
    package_dir={"": "src"},
    python_requires=">=3.10,<3.11",
    install_requires=[
        "torch==2.9.0",
        "torchvision==0.24.0",
        "torchaudio==2.9.0",
        "torchao",
        "xformers",
        "numpy",
        "opencv-python",
    ],
    entry_points={
        "console_scripts": [
            "LocalWorld=client:run",
        ],
    },
)
