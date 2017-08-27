def test_sanity():
    fish = 4
    assert 2 + 2 == fish


def test_fail():
    fish = 'fish'
    assert 2 + 2 == fish, 'FAIRY GODPARENTS!!!!'
