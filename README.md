# Menu Manager

## About This Project

This project is a menu management system built with Laravel and React. It allows users to create, update, and manage menus for a web application. The system includes features such as:

- Simple and intuitive user interface for managing menus.
- Support for nested menus with parent-child relationships.
- Real-time validation and error handling.
- Integration with Laravel's powerful features like Eloquent ORM, migrations, and validation.

## Features

- Create, update, and delete menus.
- Manage nested menus with parent-child relationships.
- Real-time validation and error handling.
- User authentication and authorization.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **Set up environment variables:**
    ```sh
    cp .env.example .env
    ```

3. **Configure your database in the `.env` file.**

4. **Install PHP dependencies:**
    ```sh
    docker compose run --rm --entrypoint composer web install
    ```

5. **Generate application key:**
    ```sh
    docker compose run --rm --entrypoint php web artisan key:generate
    ```

6. **Run migrations:**
    ```sh
    docker compose run --rm --entrypoint php web artisan migrate
    ```

7. **Install frontend dependencies:**
    ```sh
    docker compose run --rm --entrypoint npm node install
    ```

8. **Build and start the Docker containers:**
    ```sh
    docker compose up
    ```

## Usage

Once the server is running, you can access the application at `http://localhost:8000`. Log in/Register with your credentials and start managing your menus.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## Acknowledgements

- [Laravel](https://laravel.com) - The PHP framework for web artisans.
- [Inertia.js](https://inertiajs.com) - A modern stack for building single-page apps.
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework.

## Contact

If you have any questions or feedback, feel free to reach out to the project maintainer at flywithedy@gmail.com.