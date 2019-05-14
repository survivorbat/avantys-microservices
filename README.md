# Avantys

[![Build Status](https://travis-ci.org/avantys-solutionarchitecture/avantys.svg?branch=master)](https://travis-ci.org/avantys-solutionarchitecture/avantys)

Avantys is the product of a school assignment from Avans University.

## Prerequisites

This program requires Docker and Docker-Compose installed, it also required
ansible-playbook in order to 

## Getting started

1. Clone the repository by running `git clone`
2. Run the program using `make dev.up`
3. Open the the program at [https://localhost/](https://localhost/)

## Encrypted secrets

This application makes use of Ansible to encrypt secrets and set up environment
variables that should remain hidden from the outside world. We let ansible-vault
take care of that!

In production and testing the pipeline takes care of putting the secrets in an
unencrypted but protected folder on a host so that docker-compose can utilize them,
in development however this is taken care of by the expand-secrets-dev.yml file.

### Exposing secrets
1. Retrieve the vault password from one of the repository admins, this is a manual step
2. Put this password in `../.avantys-vault-password`, a file outside of the repository folder
3. Run the command `make dev.expose.secrets`

This will place the secrets in the `../.avantys-vault` folder on your machine with mode -rwx------ and will allow you
to start up the docker containers with the secrets exposed.

Just make sure to not publish or loose this folder :)
 
## Known quirks

- None yet!
