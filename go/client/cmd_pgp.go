package main

import (
	"github.com/codegangsta/cli"
	"github.com/keybase/client/go/libcmdline"
)

func NewCmdPGP(cl *libcmdline.CommandLine) cli.Command {
	return cli.Command{
		Name:        "pgp",
		Usage:       "keybase pgp [subcommands...]",
		Description: "Manipulate keybase PGP keys",
		Subcommands: []cli.Command{
			NewCmdPGPGen(cl),
		},
	}
}
