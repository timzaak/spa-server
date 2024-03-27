//@ts-ignore
import parse from '@pushcorn/hocon-parser'

test("hocon-parser can load files ", async () => {
    const data = await parse({url: './test/example.conf'})
    expect(data).toStrictEqual({a:{b:1}})
})