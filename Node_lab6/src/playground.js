const express = require('express')
const redis = require('redis').createClient()

const app = express()

redis.on("ready", () => {
    console.log('Connected to Redis')
})

const redisTest = async () => {
    await redis.connect()

    //string
    await redis.set("thisiskey","hoge")
    const val = await redis.get("thisiskey")
    console.log({val});

    //list
    const listCount = await redis.rPush("thisisarraykey", ["Ele1", "Ele2"])
    console.log({listCount});

    const listArr = await redis.lRange("thisisarraykey", 0, -1)
    console.log({listArr})

    //set
    await redis.sAdd("thisissetkey", "Apple")
    await redis.sAdd("thisissetkey", "Orange")
    await redis.sAdd("thisissetkey", "Banana")
    await redis.sAdd("thisissetkey", "Apple")
    await redis.sAdd("thisissetkey", "Apple")
    await redis.sAdd("thisissetkey", "Apple")
    await redis.sAdd("thisissetkey", "Apple")

    const setList = await redis.sMembers("thisissetkey")
    console.log({ setList })

    //hashset
    await redis.hSet("thisishashkey", "field1","Hello")
    await redis.hSet("thisishashkey", "field2","World")
    const hashList = await redis.hGetAll("thisishashkey")
    console.log(hashList);
    
    await redis.del("thisiskey")
    await redis.del("thisisarraykey")
    await redis.del("thisissetkey")
}

redisTest()

app.get('/', (req,res) => {
    res.status(200).json({ msg: 'I am working...'})
})

app.listen(4000)