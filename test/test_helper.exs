ExUnit.start

Mix.Task.run "ecto.create", ~w(-r BhelxTrack.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r BhelxTrack.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(BhelxTrack.Repo)

