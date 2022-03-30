#![allow(dead_code)]
#![allow(unused_variables)]

mod api;
pub mod commands;
mod config;
mod upload_files;

use crate::api::API;
use crate::commands::{CliCommand, Commands};
use crate::config::Config;
use crate::upload_files::upload_files;

use clap::Parser;
use console::style;
use napi_derive::napi;

// this is for bin
pub fn run() {
    let commands = CliCommand::parse();
    let result = run_with_commands(commands);
    if let Some(err) = result.err() {
        eprintln!("{}", err);
        std::process::exit(-1);
    }
}

//this is for js
#[napi]
pub fn run_with_command_options(args:String) {
    //let commands = CliCommand::parse_from(args);
    println!("hello world");
    //run_with_commands(commands);
}

fn success(message: &str) {
    println!("{}", style(message).green());
}

fn run_with_commands(commands: CliCommand) -> anyhow::Result<()> {
    let config = Config::load(commands.config_dir)?;
    println!(
        "{}",
        style(format!(
            "spa-client connect to admin server( {} )",
            &config.server.address
        ))
            .green()
    );
    let api = API::new(&config)?;

    match commands.commands {
        Commands::Info { domain } => {
            println!("{}", api.get_domain_info(domain)?);
        }
        Commands::Upload(arg) => {
            let parallel = arg.parallel.unwrap_or(config.upload.parallel);
            upload_files(api, arg.domain, arg.version, arg.path, parallel)?;
        }
        Commands::Release { domain, version } => {
            let resp = api.release_domain_version(domain, version)?;
            success(&resp);
        }
        Commands::Reload => {
            api.reload_sap_server()?;
            success("reload success!");
        }
    };
    Ok(())
}

#[cfg(test)]
mod test {
    use crate::{run_with_commands, CliCommand};
    use clap::Parser;
    use std::env;

    fn init_config() {
        env::set_var("SPA_SERVER_ADDRESS", "http://127.0.0.1:9000");
        env::set_var("SPA_SERVER_AUTH_TOKEN", "token");
        env::set_var("SPA_UPLOAD_PARALLEL", "4");
    }

    #[test]
    fn test_info() {
        init_config();
        run_with_commands(CliCommand::parse_from(&["test", "info"])).unwrap();
    }

    #[test]
    fn test_release() {
        init_config();
        run_with_commands(CliCommand::parse_from(&[
            "test",
            "release",
            "www.example.com",
            "2",
        ]))
            .unwrap();
    }
}
